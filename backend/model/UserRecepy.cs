public class UserRecepy
{
    //spooncular API recepy id
    public UserRecepy(int recepyId, int userId)
    {
        this.RecepyId = recepyId;
        this.UserId = userId;
    }

    public int Id { get; set; }
    public int RecepyId { get; set; }
    public int UserId { get; set; }
}