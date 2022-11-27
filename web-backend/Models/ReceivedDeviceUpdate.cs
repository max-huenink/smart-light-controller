using MediatR;
using web_backend.Models.SmartLight;

namespace web_backend.Models
{
    public class ReceivedDeviceUpdate : IRequest
    {
        public SmartLightModel? SmartLight { get; set; }
    }
}
