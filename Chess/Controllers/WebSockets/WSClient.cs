using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class WebSocketClient
{
    public async Task ConnectToServer(string serverUri)
    {
        ClientWebSocket clientWebSocket = new ClientWebSocket();
        await clientWebSocket.ConnectAsync(new Uri(serverUri), CancellationToken.None);

        Console.WriteLine("Connected to the server. Start sending messages...");

        string message = "Hello, WebSocket!";
        byte[] buffer = Encoding.UTF8.GetBytes(message);
        await clientWebSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);

        byte[] receiveBuffer = new byte[1024];

        while (clientWebSocket.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await clientWebSocket.ReceiveAsync(new ArraySegment<byte>(receiveBuffer), CancellationToken.None);

            if(result.MessageType == WebSocketMessageType.Text)
            {
                string receivedMessage = Encoding.UTF8.GetString(receiveBuffer,0,result.Count);
                Console.WriteLine($"Received message from server: {receivedMessage}");
            }
        }
    }
}