export default function Habit() {
  return (
    <div className="w-[80%] bg-baseColor rounded-md mx-auto h-[3rem] mt-3 flex min-w-max">
      <div id="icon" className="bg-[#E3CFB5] flex-none w-[3rem] rounded-l-md"></div>
      <div
        id="name"
        className="flex-1 flex justify-items-start content-center p-2"
      >
        <div className="min-h-auto">
          <h2 className="text-lg font-bold">Very Long Name</h2>
        </div>
      </div>
      <div id="status" className="bg-highlightColor flex-none w-[3rem] rounded-r-md"></div>
    </div>
  );
}
