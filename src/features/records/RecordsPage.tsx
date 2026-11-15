
import React from 'react';
import {
  FileText,
  Upload,
  ShieldCheck,
  Calendar,
  FilePlus2,
  ClipboardList,
} from 'lucide-react';

const RecordsPage: React.FC = () => {
  const records = [
    {
      title: 'Medical History',
      category: 'Health History',
      date: 'No records added yet',
      icon: ClipboardList,
    },
    {
      title: 'Prescription Records',
      category: 'Medications',
      date: 'No records added yet',
      icon: FileText,
    },
    {
      title: 'Lab Reports',
      category: 'Test Results',
      date: 'No records added yet',
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Medical Records
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Keep important health documents organized in one place.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#477B62] px-4 py-3 text-sm font-semibold text-white hover:bg-[#254E3B] transition"
          onClick={() => alert('Document upload will be available after storage integration.')}
        >
          <Upload size={18} />
          Upload Record
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Records', value: '0', icon: FileText },
          { label: 'Prescriptions', value: '0', icon: FilePlus2 },
          { label: 'Recent Updates', value: '0', icon: Calendar },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <Icon className="mb-3 text-[#477B62]" size={22} />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
          Your Health Documents
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {records.map((record) => {
            const Icon = record.icon;

            return (
              <div
                key={record.title}
                className="rounded-xl border border-gray-200 p-5 dark:border-gray-700"
              >
                <Icon size={24} className="mb-3 text-[#477B62]" />

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {record.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {record.category}
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  {record.date}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl bg-[#F7F8F3] p-5 text-center dark:bg-gray-800">
          <ShieldCheck
            size={30}
            className="mx-auto mb-3 text-[#477B62]"
          />
          <p className="font-medium text-gray-800 dark:text-gray-100">
            Your health information deserves protection.
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Connect secure storage to upload and manage your personal health documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
