import { RecordingPresets } from "expo-audio"

export default {
  android: {
    extension: ".m4a",
    outputFormat:
      RecordingPresets.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: RecordingPresets.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: RecordingPresets.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 8000,
    numberOfChannels: 1,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: true,
  },
}
