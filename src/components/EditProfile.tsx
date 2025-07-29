"use client"
import { UserI } from '@/types/UserType'
import { Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

const EditForm = ({ userDetail }) => {
  const [user, setUser] = useState<UserI>(userDetail)
  return (
    <div>
      <form>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <TextInput
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            required
            onChange={e => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </div>
        <div></div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            required
            onChange={e => setUser({ ...user, username: e.target.value })}
            value={user.username}
          />
        </div>
        <div></div>
      </form>
    </div>
  )
}

export default EditForm