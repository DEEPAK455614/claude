package in.divinejourney.ashtvinayak;
import android.app.Activity;import android.os.Bundle;import android.view.View;import android.webkit.WebChromeClient;import android.webkit.WebSettings;import android.webkit.WebView;import android.webkit.WebViewClient;import android.graphics.Color;import android.content.pm.ActivityInfo;
public class MainActivity extends Activity{
 private WebView web;
 @Override public void onCreate(Bundle b){super.onCreate(b);setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);getWindow().setStatusBarColor(Color.rgb(18,13,10));getWindow().setNavigationBarColor(Color.rgb(18,13,10));immersive();web=new WebView(this);web.setBackgroundColor(Color.rgb(18,13,10));WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setAllowFileAccess(true);s.setMediaPlaybackRequiresUserGesture(false);web.setWebViewClient(new WebViewClient());web.setWebChromeClient(new WebChromeClient());web.loadUrl("file:///android_asset/index.html");setContentView(web);}
 private void immersive(){getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE|View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);}
 @Override public void onWindowFocusChanged(boolean h){super.onWindowFocusChanged(h);if(h)immersive();}
 @Override public void onBackPressed(){if(web!=null&&web.canGoBack())web.goBack();else super.onBackPressed();}
}