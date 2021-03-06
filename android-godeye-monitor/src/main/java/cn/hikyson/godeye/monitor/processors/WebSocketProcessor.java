package cn.hikyson.godeye.monitor.processors;

import com.koushikdutta.async.http.WebSocket;

import cn.hikyson.godeye.monitor.server.GodEyeMonitorServer;

public class WebSocketProcessor implements Messager, Processor {
    private GodEyeMonitorServer mGodEyeMonitorServer;
    private Processor mProcessor;

    public WebSocketProcessor(GodEyeMonitorServer godEyeMonitorServer) {
        mGodEyeMonitorServer = godEyeMonitorServer;
    }

    public void setProcessor(Processor processor) {
        mProcessor = processor;
    }

    @Override
    public void sendMessage(String message) {
        mGodEyeMonitorServer.sendMessage(message);
    }

    @Override
    public void process(WebSocket webSocket, String msg) {
        mProcessor.process(webSocket, msg);
    }
}
