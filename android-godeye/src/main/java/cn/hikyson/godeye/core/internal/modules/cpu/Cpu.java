package cn.hikyson.godeye.core.internal.modules.cpu;


import cn.hikyson.godeye.core.internal.Install;
import cn.hikyson.godeye.core.internal.ProduceableSubject;
import cn.hikyson.godeye.core.utils.L;

/**
 * Created by kysonchao on 2017/5/19.
 */
public class Cpu extends ProduceableSubject<CpuInfo> implements Install<CpuContext> {
    private CpuEngine mCpuEngine;

    @Override
    public synchronized void install(CpuContext config) {
        if (mCpuEngine != null) {
            L.d("cpu already installed, ignore.");
            return;
        }
        if (!CpuUsable.usability()) {
            L.d("cpu is not usable, install ignore.");
            return;
        }
        mCpuEngine = new CpuEngine(this, config.intervalMillis(), config.sampleMillis());
        mCpuEngine.work();
        L.d("cpu installed");
    }

    @Override
    public synchronized void uninstall() {
        if (mCpuEngine == null) {
            L.d("cpu already uninstalled , ignore.");
            return;
        }
        mCpuEngine.shutdown();
        mCpuEngine = null;
        L.d("cpu uninstalled");
    }
}
