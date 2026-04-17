package com.selfinspection

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.ContentResolver
import android.media.AudioAttributes
import android.net.Uri
import android.os.Build
import android.os.Bundle
import androidx.core.app.NotificationCompat


import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "selfinspection"

override fun onCreate(savedInstanceState: Bundle?) {


   // Create notification channel (Android 8+)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val notificationChannel = NotificationChannel(
        "sound_channel",
        "selfinspection",
        NotificationManager.IMPORTANCE_HIGH
      )

      notificationChannel.setShowBadge(true)
      notificationChannel.description = ""

      val audioAttributes = AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_NOTIFICATION)
        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
        .build()

      val soundUri = Uri.parse(
        ContentResolver.SCHEME_ANDROID_RESOURCE +
          "://" + packageName + "/raw/ring_bell"
      )

      notificationChannel.setSound(soundUri, audioAttributes)
      notificationChannel.enableVibration(true)
      notificationChannel.vibrationPattern = longArrayOf(400, 400)
      notificationChannel.lockscreenVisibility =
        NotificationCompat.VISIBILITY_PUBLIC

      val manager = getSystemService(NotificationManager::class.java)
      manager?.createNotificationChannel(notificationChannel)
    }
    
    setTheme(R.style.AppTheme)
    super.onCreate(savedInstanceState)

     
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
