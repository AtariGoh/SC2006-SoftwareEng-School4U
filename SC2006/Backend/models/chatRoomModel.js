// backend/models/chatRoomModel.js
const supabase = require('../src/supabaseClient');

// Fetch all chat rooms
exports.getAllChats = async () => {
  const { data, error } = await supabase
    .from('chat_rooms')
    .select('*');
  if (error) throw error;
  return data;
};

// Add user to a chat room
exports.joinChatRoom = async (userId, chatRoomId) => {
  const { data, error } = await supabase
    .from('chat_participants')
    .insert([{ user_id: userId, chat_room_id: chatRoomId }]);
  if (error) throw error;
  return data;
};

exports.verifyParent = async(userId, schoolId) => {
    const{data, error}=await supabase
        .from('parents')
        .select('*')
        .eq('user_id', userId)
        .eq('school_id',schoolId);
    
    if(error || data.length ===0){
        throw new Error("User is not a verified parent for this school");
    }
    
    return true; //user is verified
};
