cat > screens/SMSScanner.jsx <<EOL
import React, {useState} from "react";
import {View, TextInput, Button} from "react-native";

export default function SMSScanner(){
  const [msg,setMsg]=useState("");
  const send=async()=>{
    await fetch("http://192.168.1.100:8000/scan/sms",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({message:msg})
    });
    setMsg("");
  };
  return (
    <View style={{padding:20}}>
      <TextInput placeholder="Enter SMS" value={msg} onChangeText={setMsg} style={{borderWidth:1,borderColor:"#ccc",padding:10,marginBottom:10}}/>
      <Button title="Scan SMS" onPress={send}/>
    </View>
  )
}
EOL
