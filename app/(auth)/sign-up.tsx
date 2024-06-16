import * as React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
      router.push("/home");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
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
    <SafeAreaView className="w-full h-screen">
      <ScrollView className="w-full">
        <View className="w-full flex-row items-center justify-center">
          <Text className="font-bold text-blue-400 text-center">Register your account</Text>
        </View>
      <View>
      {!pendingVerification && (
        <View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignUpPress}>
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGooglePress}>
            <Text>Sign up with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onFacebookPress}>
            <Text>Sign up with Facebook</Text>
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Text>Already have an account? </Text>
            <Link href="/sign-in">Login</Link>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
      </ScrollView>
 
    </SafeAreaView>
   
  );
}
