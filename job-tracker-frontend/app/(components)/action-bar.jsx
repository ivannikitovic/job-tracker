"use client";

export default function ActionBar() {
    return (
        <div className="flex fixed inset-x-0 bottom-10 justify-center">
            <div className="border pl-5 pr-5 pt-3 pb-3 rounded-3xl border-blue-500 bg-blue-500 text-white space-x-5">
                <button>ADD</button>
                <button>EXPORT</button>
                <button>CHART</button>
            </div>
        </div>
    );
}
