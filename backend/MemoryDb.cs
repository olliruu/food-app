using Microsoft.EntityFrameworkCore;

class MemoryDb : DbContext
{
	public MemoryDb(DbContextOptions<MemoryDb> options)
		: base(options) { }

	public DbSet<User> Users => Set<User>();

	public DbSet<UserRecepy> Recepies => Set<UserRecepy>();
}