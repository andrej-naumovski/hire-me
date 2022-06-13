export interface Child {
    childId: string;
    name: {
        fullName: string;
    };
    birthday: string;
    checkedIn: boolean;
    checkinTime: string | null;
    pickupTime: string | null;
}
