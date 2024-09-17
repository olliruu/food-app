using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MemoryDb>(opt => opt.UseInMemoryDatabase("myDb"));
builder.Services.AddHttpClient("client", client =>
{
    //client.DefaultRequestHeaders.Add("x-api-key", "72dac17c1a424b4f9d65a0a952a8f0c6");
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");

app.MapGet("/random_recepy/{uid}", async ([FromQuery(Name = "count")] int count, int uid, HttpClient client, MemoryDb db) =>
    {

        //get recepies from API
        var url = String.Format("https://api.spoonacular.com/recipes/complexSearch?apiKey=72dac17c1a424b4f9d65a0a952a8f0c6&sort=random&number={0}&addRecipeInstructions=true", count);
    System.Console.WriteLine(url);
    var response = await client.GetAsync(url);
        var t = await response.Content.ReadAsStringAsync();
        Console.WriteLine(t);
    if (response.IsSuccessStatusCode)
    {
        var stringResonse = await response.Content.ReadAsStringAsync();
        List<RecepyInfo> recepies = JsonSerializer.Deserialize<RecepyResponse>(stringResonse).results;
        
        //add recepies to user's history
        foreach(RecepyInfo r in recepies)
        {
            db.Recepies.Add(new UserRecepy(r.id, uid));
        }
            await db.SaveChangesAsync();
        return Results.Ok(recepies);
    } 
    else
    {
        return Results.NoContent();
    }
});

app.MapGet("/recepy/{id}", async (int id, HttpClient client) =>
{
    //get recepy from API
    var url = $"https://api.spoonacular.com/recipes/{id}/analyzedInstructions?apiKey=72dac17c1a424b4f9d65a0a952a8f0c6";
    var response = await client.GetAsync(url);
    if (response.IsSuccessStatusCode)
    {
        var stringResonse = await response.Content.ReadAsStringAsync();
        
        List<Recepy> recepy = JsonSerializer.Deserialize<List<Recepy>>(stringResonse);
        return Results.Ok(recepy[0]);
    }
    else
    {
        return Results.NoContent();
    }
});

app.MapGet("/history/{uid}", async (int uid, MemoryDb db, HttpClient client) =>
{
    //get recepy list from from spooncular after backend id

    var recepyIds = await db.Recepies.Where(r => r.UserId == uid).Select(r=> r.RecepyId).ToListAsync();
    var idsAsString = String.Join(",", recepyIds);
    
    if (recepyIds.Count < 1)
    {
        return Results.NoContent();
    }

    //get recepies from API
    var url = $"https://api.spoonacular.com/recipes/informationBulk?apiKey=72dac17c1a424b4f9d65a0a952a8f0c6&ids={idsAsString}";
    var response = await client.GetAsync(url);
    if (response.IsSuccessStatusCode)
    {
        var stringResonse = await response.Content.ReadAsStringAsync();
        List<RecepyInfo> recepies = JsonSerializer.Deserialize<List<RecepyInfo>>(stringResonse);
        return Results.Ok(recepies);
    }
    else
    {
        return Results.NoContent();
    }
});

//delete recepy from history
app.MapDelete("/history", async ([FromQuery(Name = "id")] int id, [FromQuery(Name = "uid")] int uid, MemoryDb db) =>
{
    //await db.Recepies.Where(r=> r.UserId == uid && r.RecepyId == id).ExecuteDeleteAsync();
    var recepiesToDelete = db.Recepies.Where(r => r.UserId == uid && r.RecepyId == id);
    foreach (var recepy in recepiesToDelete)
    {
        db.Recepies.Remove(recepy);
    }
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapPost("/register", async (User user, MemoryDb db) =>
{
    var u = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
    if(u != null)
    {
        return Results.Unauthorized();
    }
    
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Ok(user.Id);
});

app.MapPost("/login", async (User user, MemoryDb db) =>
{
    var u = await db.Users.FirstOrDefaultAsync(x => x.Name == user.Name && x.Password == user.Password);
    if (u != null)
    {
        return Results.Ok(u.Id);
    } 
    else
    {
        return Results.Unauthorized();
    }
});

app.Run();
