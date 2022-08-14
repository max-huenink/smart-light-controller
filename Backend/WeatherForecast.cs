namespace Backend
{
    public class WeatherForecast
    {
        private static Random rnd = new Random();
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
        public int Id => rnd.Next(10000);
    }
}
