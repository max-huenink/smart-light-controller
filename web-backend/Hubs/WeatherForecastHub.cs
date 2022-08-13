using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace web_backend.Hubs
{
    public class WeatherForecastHub : Hub
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public WeatherForecastHub()
        {
        }

        public async Task NewMessage(long username, string message) => await Clients.All.SendAsync("messageReceived", username, message);

        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}