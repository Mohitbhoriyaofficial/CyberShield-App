cat > screens/URLScanner.jsx <<EOL
import React, {useState} from "react";
import {View, TextInput, Button} from "react-native";

export default function URLScanner(){
  const [url,setUrl]=useState("");
  const send=async()=>{
    await fetch("http://192.168.1.100:8000/scan/url",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({url:url})
    });
    setUrl("");
  };
  return (
    <View style={{padding:20}}>
      <TextInput placeholder="Enter URL" value={url} onChangeText={setUrl} style={{borderWidth:1,borderColor:"#ccc",padding:10,marginBottom:10}}/>
      <Button title="Scan URL" onPress={send}/>
    </View>
  )
}
EOL
