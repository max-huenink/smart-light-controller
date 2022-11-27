using MediatR;
using MQTTnet;
using MQTTnet.Client;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using web_backend.Models.SmartLight;

namespace web_backend.Clients
{
    public class MqttClient : IDisposable
    {
        private readonly Regex ConfigRex = new(@"smartLights/(?<deviceName>\w*)/config");
        private readonly Regex StateRex = new(@"smartLights/(?<deviceName>\w*)/state");
        private readonly IMqttClient _client;
        private readonly IMediator _mediator;
        private bool disposedValue;

        public MqttClient(IMediator mediator)
        {
            _mediator = mediator;
            //MQTTnet.Client.MqttClient x = new();
            var mqttFactory = new MqttFactory();
            _client = mqttFactory.CreateMqttClient();
            var mqttClientOptions = new MqttClientOptionsBuilder().WithTcpServer("localhost", 12345).Build();
            _client.ApplicationMessageReceivedAsync += MessageReceived;
            _client.SubscribeAsync("smartLights/+/state");
        }

        private async Task MessageReceived(MqttApplicationMessageReceivedEventArgs msg)
        {
            // publish config
            // smartLights/{deviceName}/config
            // receive state
            // smartLights/{deviceName}/state

            var topic = msg.ApplicationMessage.Topic;
            var state = StateRex.Match(topic);
            if (state.Success)
            {
                var name = state.Groups["deviceName"];
                var body = msg.ApplicationMessage.ConvertPayloadToString();
                //JsonConverterFactory x;
                //System.Text.Json.Serialization.JsonConverter()
                await _mediator.Send("");
                await Task.CompletedTask;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                    _client.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }

        // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
        // ~MqttClient()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
