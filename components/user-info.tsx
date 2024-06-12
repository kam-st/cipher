import { ExtendedUser } from "@/types/next-auth";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] rounded-none shadow-none m-6">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 ">
          <p className="text-sm font-medium">ID</p>
          <p className="truncate text-sx max-w-[180px] px-2 py-1  bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 ">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-sx max-w-[180px] px-2 py-1  bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 ">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-sx max-w-[180px] px-2 py-1  bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 ">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-sx max-w-[180px] px-2 py-1  bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 ">
          <p className="text-sm font-medium">Two Factor Autentication</p>
          <Badge
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            className="rounded-md"
          >
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
