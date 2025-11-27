

import { useParams } from "react-router-dom";
import ProviderChat from "../../components/ProviderChat";

const ProviderChatPage = () => {
const provider = JSON.parse(localStorage.getItem("provider"));
const providerId = provider?._id;

if (!providerId) return <div>Loading provider...</div>;

return <ProviderChat providerId={providerId} />;

};

export default ProviderChatPage;
