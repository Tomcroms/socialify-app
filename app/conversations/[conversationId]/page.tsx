import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from './components/Header';
import Body from "./components/Body";
import Form from "./components/Form";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams{ 
    conversationId: string;
};

const ConversationId = async ({ params }: { params: Iparams }) => {

    const currentUser = await getCurrentUser();
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-[544px] h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} currentUser={currentUser} />
                <Form />
            </div>
      </div>
    )
};

export default ConversationId;