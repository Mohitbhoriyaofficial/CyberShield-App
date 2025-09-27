import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, Button, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Sample SMS dataset
const smsData = [
  { id: '1', message: "Congratulations! You've won a lottery. Click http://scamlink.com" },
  { id: '2', message: "Meeting at 5 PM, don’t be late." },
  { id: '3', message: "Free money waiting for you, claim now!" },
  { id: '4', message: "Your Amazon order has been shipped." },
];

// Sample Wi-Fi dataset
const wifiData = [
  { id: '1', ssid: 'FreeWiFi', encryption: 'None', signal: 80 },
  { id: '2', ssid: 'HomeNetwork', encryption: 'WPA2', signal: 95 },
  { id: '3', ssid: 'CoffeeShop', encryption: 'None', signal: 60 },
  { id: '4', ssid: 'SecureNet', encryption: 'WPA3', signal: 85 },
];

// Sample app permissions dataset
const appData = [
  { id: '1', name: 'PhotoEditor', permissions: ['Camera', 'Storage', 'Location'] },
  { id: '2', name: 'ChatApp', permissions: ['Contacts', 'Microphone'] },
  { id: '3', name: 'WeatherApp', permissions: ['Location'] },
  { id: '4', name: 'Calculator', permissions: ['None'] },
];

// Function to detect scammy SMS
const detectScam = (text) => {
  const scamKeywords = /(lottery|free money|click here|http:\/\/|https:\/\/)/i;
  return scamKeywords.test(text);
};

// Function to detect risky permissions
const detectRiskyPermissions = (permissions) => {
  const riskyPermissions = /(Camera|Location|Contacts|Microphone)/i;
  return permissions.some(perm => riskyPermissions.test(perm));
};

// Dashboard Screen
function Dashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bar-chart" size={24} color="#007AFF" style={styles.headerIcon} />
        <Text style={styles.title}>CyberShield Dashboard</Text>
      </View>
      <Text style={styles.text}>System Status: Secure ✅</Text>
      <Button
        title="Report Scam"
        onPress={() => navigation.navigate('Report')}
        color="#007AFF"
        style={styles.button}
      />
    </SafeAreaView>
  );
}

// SMS Scanner Screen
function SMSScanner() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="mail" size={24} color="#007AFF" style={styles.headerIcon} />
        <Text style={styles.title}>SMS Scanner</Text>
      </View>
      <FlatList
        data={smsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>{item.message}</Text>
            <Text style={[styles.statusText, { color: detectScam(item.message) ? '#DC3545' : '#28A745' }]}>
              {detectScam(item.message) ? '❌ Scam Detected' : '✅ Safe'}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// URL Scanner Screen
function URLScanner() {
  const [url, setUrl] = React.useState('');
  const [result, setResult] = React.useState('');

  const scanUrl = () => {
    const scamPattern = /(free|scam|lottery|money|click)/i;
    if (scamPattern.test(url)) {
      setResult('❌ Malicious URL detected!');
    } else {
      setResult('✅ Safe URL');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="link" size={24} color="#007AFF" style={styles.headerIcon} />
        <Text style={styles.title}>URL Scanner</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter URL..."
        value={url}
        onChangeText={setUrl}
      />
      <Button title="Scan URL" onPress={scanUrl} color="#007AFF" style={styles.button} />
      {result ? <Text style={[styles.text, { color: result.includes('Malicious') ? '#DC3545' : '#28A745' }]}>{result}</Text> : null}
    </SafeAreaView>
  );
}

// Wi-Fi Scanner Screen
function WifiScanner() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="wifi" size={24} color="#007AFF" style={styles.headerIcon} />
        <Text style={styles.title}>Wi-Fi Scanner</Text>
      </View>
      <FlatList
        data={wifiData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>SSID: {item.ssid}</Text>
            <Text style={styles.text}>Signal: {item.signal}%</Text>
            <Text style={[styles.statusText, { color: item.encryption === 'None' ? '#DC3545' : '#28A745' }]}>
              {item.encryption === 'None' ? '❌ Open Network' : '✅ Secure'}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// App Permissions Scanner Screen
function AppPermissionsScanner() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="apps" size={24} color="#007AFF" style={styles.headerIcon} />
        <Text style={styles.title}>App Permissions Scanner</Text>
      </View>
      <FlatList
        data={appData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>App: {item.name}</Text>
            <Text style={styles.text}>Permissions: {item.permissions.join(', ')}</Text>
            <Text style={[styles.statusText, { color: detectRiskyPermissions(item.permissions) ? '#DC3545' : '#28A745' }]}>
              {detectRiskyPermissions(item.permissions) ? '❌ Risky Permissions' : '✅ Safe'}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Report Screen
function Report() {
  const sendReport = () => {
    Alert.alert("📢 Report Sent", "Your scam report has been submitted to authorities.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="alert-circle" size={24} color="#007AFF" style={styles.headerIcon} />
        <Text style={styles.title}>Report Scam</Text>
      </View>
      <Text style={styles.text}>If you find suspicious activity, report it here.</Text>
      <Button title="Submit Report" onPress={sendReport} color="#007AFF" style={styles.button} />
    </SafeAreaView>
  );
}

// Bottom Tabs
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'SMS Scanner') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'URL Scanner') {
            iconName = focused ? 'link' : 'link-outline';
          } else if (route.name === 'Wi-Fi Scanner') {
            iconName = focused ? 'wifi' : 'wifi-outline';
          } else if (route.name === 'App Permissions') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'alert-circle' : 'alert-circle-outline';
          }

          return <Ionicons name={iconName} size={size + 4} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingTop: 5,
          height: 70 + (insets.bottom || 10),
          paddingBottom: insets.bottom ? insets.bottom + 5 : 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="SMS Scanner" component={SMSScanner} />
      <Tab.Screen name="URL Scanner" component={URLScanner} />
      <Tab.Screen name="Wi-Fi Scanner" component={WifiScanner} />
      <Tab.Screen name="App Permissions" component={AppPermissionsScanner} />
      <Tab.Screen name="Report" component={Report} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#212529',
  },
  text: {
    fontSize: 16,
    color: '#212529',
    marginVertical: 8,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    padding: 12,
    marginVertical: 10,
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  button: {
    borderRadius: 8,
    padding: 10,
  },
});