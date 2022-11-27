namespace web_backend.Models.SmartLight
{
    public class SmartLightModel
    {
        public string? Name { get; set; }
        public SmartLightState? State { get; set; }
        public PossibleTraits[]? Traits { get; set; }
    }
}
