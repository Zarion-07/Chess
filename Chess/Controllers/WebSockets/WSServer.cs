using System;
using System.Net;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

class WebSocketServer
{
    public async Task StartServer(string IPAddress, int port)
    {
        HttpListener listener = new HttpListener();
        listener.Prefixes.Add($"https://{IPAddress}:{port}/");
        listener.Start();

        Console.WriteLine("Server started. Waiting for connections...");
        
        while(true)
        {
            HttpListenerContext context = await listener.GetContextAsync();
            if(context.Request.IsWebSocketRequest)
            {
                await ProcessWebSocketRequest(context);
            }

            else
            {
                context.Response.StatusCode = 400;
                context.Response.Close();
            }
        }
    }
    
    private async Task ProcessWebSocketRequest(HttpListenerContext context)
    {
        HttpListenerWebSocketContext webSocketContext = await context.AcceptWebSocketAsync(null);
        WebSocket socket = webSocketContext.WebSocket;

        byte[] buffer = new byte[1024];

        while(socket.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if(result.MessageType == WebSocketMessageType.Text)
            {
                string receivedMessage = System.Text.Encoding.UTF8.GetString(buffer,0,result.Count);
                Console.WriteLine($"Received message: {receivedMessage}");

                await socket.SendAsync(new ArraySegment<byte>(buffer,0,result.Count), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            
            else if(result.MessageType == WebSocketMessageType.Close)
            {
                await socket.CloseAsync(WebSocketCloseStatus.NormalClosure,"", CancellationToken.None);
            }
        }
    }
}

