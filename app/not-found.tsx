import {redirect} from "next/navigation";

export default function NotFoundRedirect(): void {
    redirect("/lost-in-space");
}
