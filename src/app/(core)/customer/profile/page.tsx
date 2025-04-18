import { ProfileCustomer } from "@/components/customer/profile_customer";
import { HeaderCustomerCarrier } from "@/components/customer_carrier/header_customer_carrier";

const ProfileCustomerPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center ">
      <div className="w-full ">
        <HeaderCustomerCarrier/>
        <ProfileCustomer/>
      </div>
    </div>
  );
}

export default ProfileCustomerPage