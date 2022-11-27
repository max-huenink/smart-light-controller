namespace web_backend.Models.SmartLight
{
    public class SmartLightState : IOnOffTrait, IColorTrait, IBrightnessTrait, IWakeModeTrait
    {
        public bool LightOn { get; set; }
        public IRGB? Color { get; set; }
        public int Brightness { get; set; }
        public bool WakeModeOn { get; set; }
    }
}
