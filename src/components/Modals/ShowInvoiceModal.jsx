function ShowInvoiceModal({ setShowInvoiceModal }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white md:w-[400px] mmd:w-[500px] lg:w-[600px] rounded-lg shadow-lg p-5">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Invoice</h2>
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>
  
          {/* Invoice Content */}
          <div>
            {/* Logo and Header */}
            <div className="flex justify-between items-center mb-5 bg-[#ffebeb] p-10">
              <img src="/logo.png" alt="Logo" className="h-10" />
              <div className="text-right text-[#000000]">
                <p className="text-sm">
                  Invoice No: <b>#123554</b>
                </p>
                <p className="text-sm">
                  Job Id: <b>#123554</b>
                </p>
                <p className="text-sm">
                  Date: <b>02/05/2025</b>
                </p>
              </div>
            </div>
  
            {/* Title */}
            <h3 className="text-center text-lg font-semibold mb-4">
              Your Service Cost
            </h3>
  
            {/* Client Details */}
            <div className="mb-4">
              <p>MR. Zuberii</p>
              <p>Human Resources</p>
              <p>Micromise</p>
              <p>1105-D Mugassari, Gergaji</p>
              <p>E89 USA</p>
            </div>
  
            {/* Cost Breakdown */}
            <div>
              <h4 className="font-semibold mb-2">Cost Breakdown</h4>
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="bg-[#ffebeb] rounded-md">
                    <th className="px-2 py-1">No</th>
                    <th className="px-2 py-1">Services</th>
                    <th className="px-2 py-1">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1">01</td>
                    <td className="px-2 py-1">ECU Remapping</td>
                    <td className="px-2 py-1">$500</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">02</td>
                    <td className="px-2 py-1">Carbon</td>
                    <td className="px-2 py-1">$200</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">03</td>
                    <td className="px-2 py-1">LPG</td>
                    <td className="px-2 py-1">$200</td>
                  </tr>
                  {/* Dashed Divider */}
                  <tr>
                    <td colSpan="3">
                      <div className="border-t border-dashed border-secondary my-4"></div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="px-2 py-1 font-bold">
                      Total Cost
                    </td>
                    <td className="px-2 py-1">$900</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="px-2 py-1 font-bold">
                      Payment
                    </td>
                    <td className="px-2 py-1">Paid</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
  
          {/* Footer */}
          <div className="mt-20 w-full h-5 bg-secondary"></div>
        </div>
      </div>
    );
  }
  
  export default ShowInvoiceModal;
  