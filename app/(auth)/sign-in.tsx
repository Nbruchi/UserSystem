import React from "react";
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import {FontAwesome5} from "@expo/vector-icons"
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  useWarmUpBrowser();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.push("/home");
    } catch (err: any) {
      console.log(err);
    }
  };

  const googleOAuth = useOAuth({
    strategy: "oauth_google",
  });

  const facebookOAuth = useOAuth({
    strategy: "oauth_facebook",
  });

  const onGooglePress = React.useCallback(async (): Promise<void> => {
    try {
      const { createdSessionId } = await googleOAuth.startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.push("/home");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [googleOAuth, setActive]);

  const onFacebookPress = React.useCallback(async (): Promise<void> => {
    try {
      const { createdSessionId } = await facebookOAuth.startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.push("/home");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [facebookOAuth, setActive]);

  return (
    <SafeAreaView className="w-full h-screen p-4">
      <ScrollView className="w-full">
        <View className="flex-col items-center justify-center w-full min-h-[90vh]">
          <Text>Register account</Text>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignInPress}>
            <Text>Sign in</Text>
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Text>Don't have an account? </Text>
            <Link href="/sign-up">Register here</Link>
          </View>
          <Button title="Sign in with Google" onPress={onGooglePress} />
          <Button title="Sign in with Facebook" onPress={onFacebookPress} />
          <TouchableOpacity>
            <Text>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Sign in with Facebook</Text>
            <FontAwesome5 name="facebook" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
