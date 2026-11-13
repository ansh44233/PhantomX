// Discord RPC test script - ACTIVE
const DiscordRPC = require('discord-rpc');

// Current Discord Application ID
const clientId = '1401213821023948850';

console.log('🎮 Testing Discord RPC connection...');
console.log('🎮 Client ID:', clientId);
console.log('🎮 Make sure Discord desktop app is running!');
console.log('');

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

rpc.on('ready', () => {
  console.log('✅ Discord RPC connected successfully!');
  console.log('✅ Discord user:', rpc.user?.username || 'Unknown');
  console.log('');
  
  // Set a test activity
  console.log('🎮 Setting test activity...');
  rpc.setActivity({
    details: 'Testing VoidStream',
    state: 'Discord RPC Active',
    startTimestamp: Date.now(),
    largeImageKey: 'logo',
    largeImageText: 'VoidStream',
    instance: false,
  }).then(() => {
    console.log('✅ Test activity set successfully!');
    console.log('✅ Check your Discord profile - you should see "Playing VoidStream"!');
    console.log('');
    console.log('🎯 Discord RPC is working! You can now run the main app.');
    
    // Keep the connection alive for 15 seconds
    setTimeout(() => {
      console.log('🔄 Test complete. Clearing activity...');
      rpc.clearActivity().then(() => {
        rpc.destroy();
        console.log('✅ Test finished successfully!');
        process.exit(0);
      });
    }, 15000);
  }).catch((error) => {
    console.error('❌ Failed to set test activity:', error);
    process.exit(1);
  });
});

rpc.on('disconnected', () => {
  console.log('❌ Discord RPC disconnected');
});

console.log('🔑 Attempting Discord login...');
rpc.login({ clientId })
  .then(() => {
    console.log('✅ Discord RPC login initiated successfully!');
  })
  .catch((error) => {
    console.error('❌ Discord RPC login failed:');
    console.error('Error:', error.message);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('1. ✅ Make sure Discord desktop app is running');
    console.log('2. ✅ Check if the Client ID is correct');
    console.log('3. ✅ Verify you created the Discord application');
    console.log('4. ✅ Make sure you uploaded the "logo" asset');
    console.log('5. ✅ Try restarting Discord');
    process.exit(1);
  });