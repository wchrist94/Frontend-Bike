import Bike from "./Bike";
import company from "./Company";

enum userTypes {
  admin,
  developer,
  tester
}

type User = {
    id: number;
    name: string;
    company: company;
    type: userTypes;
    bikes: Bike[];
}

export default User;