using Backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddCors(opts =>
//{
//    opts.AddPolicy("ClientPermission", policy =>
//    {
//        policy.AllowAnyHeader()
//        .AllowAnyMethod()
//        .WithOrigins("http://localhost:3000")
//        .AllowCredentials();
//    });
//});
builder.Services.AddSignalR(opts =>
{
    opts.EnableDetailedErrors = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("ClientPermission");
//app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthorization();


//app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
    );

app.MapHub<WeatherForecastHub>("/hub/test");

app.Run();
