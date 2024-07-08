import { ContactInfo } from "../components/ContactListItem";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Mess: undefined;
    BottomTab: undefined;
    Intro: undefined;
    NoteList: undefined;
    Chat: { contact: ContactInfo };
    Stack: RootStackParamList;
}  