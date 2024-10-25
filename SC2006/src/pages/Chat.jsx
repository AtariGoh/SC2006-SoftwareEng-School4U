import React from "react";
import ButtonCardForChat from "../components/ButtonCardForChat"; // Reusable card component
import { useState } from "react";
import psgImage from "../assets/psg-image.png";
import afterpri from "../assets/The-Transition-from-Primary-to-Secondary-School.png";
import aftsec from "../assets/after-secondary.png"


const Chat = () => {


  const[allChats]=useState([]);


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Parents Chat Forum</h2>
      <p className="text-lg mb-6">
        Join channel to understand the school life of your children.
      </p>
      <ul>
        {allChats.map((chat)=>(
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
     
      {/* Flexbox container for horizontal alignment */}
      <div className="flex space-x-6">
        {/* Card 1 */}
        <ButtonCardForChat
          title="Parents Support Group"
          imageUrl={psgImage}
          description="Ask any questions or share advice about your child's school experience."
          linkText={"Join chat"}
          linkHref={"/psgchat"} // Enable the link only if authenticated
          //onClick={isVerified } // Handle verification if not authenticated
          //blurred={!isVerified} // Blur if not verified
        />
      </div>


      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Your children's roadmap</h2>
        <p className="text-lg mb-6">
          Join channel to understand what to expect in the transition to their next phase of journey.
        </p>
       
        {/* Flexbox container for horizontal alignment */}
        <div className="flex space-x-6">
          {/* Card 4 */}
          <ButtonCardForChat
            title="After primary school"
            imageUrl={afterpri}
            description="Discuss with parents how to choose a secondary school after PSLE."
            linkText="Join chat"
            linkHref="/aftprichat"
          />


          {/* Card 5 */}
          <ButtonCardForChat
            title="After secondary school"
            imageUrl={aftsec}
            description="Discuss with parents where to go after secondary schools."
            linkText="Join chat"
            linkHref="/aftsecchat"
          />
        </div>
      </div>
    </div>
  );
};


export default Chat;



