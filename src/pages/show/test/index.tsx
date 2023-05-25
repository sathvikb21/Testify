import Link from "next/link";
import Navbar from "~/components/Navbar";
import { useState } from "react";
import { api } from "~/utils/api";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Test = () => {
  const [sectionId, setSectionId] = useState("");

  const user = api.user.getUser.useQuery();

  const tests = user.data?.testsTaken;

  return (
    <>
      <Navbar />

      <div className="space-y-5">
        <h1>Test</h1>

        <div className="flex w-1/4 flex-col">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sectionId}
              label="Age"
              onChange={(e) => setSectionId(e.target.value)}
            >
              {user.data?.sections.map((section, index) => {
                return (
                  <MenuItem key={index} value={section.id}>
                    {section.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        {tests?.map((Test, index) => {
          return (
            <>
              <div className="flex w-screen justify-between border border-red-500 p-10">
                <div className="flex flex-col">
                  <h1>{Test.test.name}</h1>
                  <h1>{Test.test.description}</h1>
                </div>
                <Link
                  href={`/show/test/${Test.id}`}
                  key={index}
                  className="rounded-md bg-blue-500 p-2 text-white"
                >
                  Take Test
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Test;
