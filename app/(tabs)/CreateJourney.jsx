import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields from "../../components/InputFields";
import { useTrip } from "../../context/TripContext";

// title,  startDate, endDate, summary
const CreateJourney = () => {
  const { loading, createTrip } = useTrip();
  const [form, setForm] = useState({
    user_id: userId || "",
    title: "",
    startDate: "",
    endDate: "",
    summary: "",
  });
  const handleSubmit = async () => {

    // if(!title)
    // {
    //   // toast here
    // }

    const payload = {
      user_id: user?.id,
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
      summary: form.summary,
    };
    try {
      const result = await createTrip(payload);
    } catch (error) {
      throw error;
    }
  };
  return (
    <SafeAreaView>
      <InputFields />
    </SafeAreaView>
  );
};

export default CreateJourney;
