"use client";

import { ProfileEdit } from "@/actions/profileEdit";
import { UserI } from "@/types/UserType";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const EditForm = ({ userDetail }) => {
  const [user, setUser] = useState<UserI>(userDetail);
  const [saving, setSaving] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "nextgram");
    const clResponse = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL,
      formdata
    );
    setUser({ ...user, profilePic: clResponse.data.secure_url });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await ProfileEdit(user);
    setSaving(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-10">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Profile settings
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground">Edit profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-5">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-border">
              <Image
                src={user.profilePic}
                alt="Profile"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:shadow">
              Upload new photo
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label htmlFor="username" className="text-xs font-semibold uppercase tracking-wide">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:shadow-md disabled:opacity-70"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
