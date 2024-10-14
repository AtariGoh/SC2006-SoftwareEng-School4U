import React from "react";
import ButtonCardForChat from "../components/ButtonCardForChat"; // Reusable card component

const Chat = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Parents Chat Forum</h2>
      <p className="text-lg mb-6">
        Join channel to understand the school life of your children.
      </p>
      
      {/* Flexbox container for horizontal alignment */}
      <div className="flex space-x-6">
        {/* Card 1 */}
        <ButtonCardForChat
          title="Parents Support Group"
          imageUrl="https://www.helpmychildlearn.org/wp-content/uploads/2019/12/support-group-image.png"
          description="Ask any questions or share advice about your child's school experience."
          linkText="Join chat"
          linkHref="#join"
        />

        {/* Card 2: School Events */}
        <ButtonCardForChat
          title="School Events"
          imageUrl="school-events.jpg"
          description="Ask any questions or share advice about school events."
          linkText="Join chat"
          linkHref="#join"
        />

        {/* Card 3: School Matters */}
        <ButtonCardForChat
          title="School Matters"
          imageUrl="school-matters.jpg"
          description="Discuss school-related topics and concerns."
          linkText="Join chat"
          linkHref="#join"
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
            imageUrl="https://www.helpmychildlearn.org/wp-content/uploads/2019/12/support-group-image.png"
            description="Discuss with parents how to choose a secondary school after PSLE."
            linkText="Join chat"
            linkHref="#join"
          />

          {/* Card 5 */}
          <ButtonCardForChat
            title="After secondary school"
            imageUrl="post-sec-school.jpg"
            description="Discuss with parents where to go after secondary schools."
            linkText="Join chat"
            linkHref="#join"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
