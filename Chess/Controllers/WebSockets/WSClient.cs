using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class WebSocketClient
{
    public async Task ConnectToServer(string serverUri)
    {
        using ClientWebSocket client = new ClientWebSocket();

        await client.ConnectAsync(new Uri(serverUri), CancellationToken.None);
        Console.WriteLine("Connected to server.");

        // Start receive loop
        _ = Task.Run(async () =>
        {
            byte[] receiveBuffer = new byte[2048];

            while (client.State == WebSocketState.Open)
            {
                var result = await client.ReceiveAsync(new ArraySegment<byte>(receiveBuffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await client.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
                    Console.WriteLine("Server closed connection.");
                    break;
                }

                string msg = Encoding.UTF8.GetString(receiveBuffer, 0, result.Count);
                Console.WriteLine("Received: " + msg);
            }
        });

        // Send loop
        while (client.State == WebSocketState.Open)
        {
            string? input = Console.ReadLine();
            
            if (input != null)
            {
                byte[] buffer = Encoding.UTF8.GetBytes(input);

                await client.SendAsync(
                new ArraySegment<byte>(buffer),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None
                );
            }
            
            else
            {
                continue;
            }
            
        }
    }
}
