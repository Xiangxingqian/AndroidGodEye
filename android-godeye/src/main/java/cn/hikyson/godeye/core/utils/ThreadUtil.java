package cn.hikyson.godeye.core.utils;

import android.os.Handler;
import android.os.Looper;

import java.util.concurrent.Executor;

/**
 * Created by kysonchao on 2018/1/19.
 */
public class ThreadUtil {
    public static boolean isMainThread() {
        return Looper.myLooper() == Looper.getMainLooper();
    }

    public static void ensureMainThread(String tag) {
        if (!isMainThread()) {
            throw new IllegalStateException(tag + " operation must execute on main thread!");
        }
    }

    public static void ensureMainThread() {
        ensureMainThread("this");
    }

    public static void ensureWorkThread(String tag) {
        if (isMainThread()) {
            throw new IllegalStateException(tag + " operation must execute on work thread!");
        }
    }

    public static void ensureWorkThread() {
        ensureWorkThread("this");
    }

    private static Handler sHandler = new Handler(Looper.getMainLooper());

    public static Executor sMain = new Executor() {
        @Override
        public void execute(Runnable command) {
            sHandler.post(command);
        }
    };
}
