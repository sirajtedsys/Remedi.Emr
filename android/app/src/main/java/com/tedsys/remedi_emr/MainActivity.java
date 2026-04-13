package com.tedsys.remedi_emr;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;
// import com.tedsys.billingdispensedisplay.AudioControlPlugin;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // registerPlugin(AudioControlPlugin.class);
        super.onCreate(savedInstanceState);

        // ✅ Register custom plugin
        // registerPlugin(AudioControlPlugin.class);
        

        // Existing WebView config
        WebView webView = getBridge().getWebView();
        WebSettings webSettings = webView.getSettings();
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    }
}