import { HeaderCustomerCarrier } from "@/components/customer_carrier/header_customer_carrier";
import { ProfileCarrier } from "@/components/carrier/profile_carrier";

const ProfileCarrierPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center ">
      <div className="w-full ">
        <HeaderCustomerCarrier/>
        <ProfileCarrier/>
      </div>
    </div>
  );
}

export default ProfileCarrierPage