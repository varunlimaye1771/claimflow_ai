import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ClaimTableRow from './ClaimTableRow';

const ClaimsTable = ({ claims, sortConfig, onSort }) => {
  const getSortIcon = (column) => {
    if (sortConfig?.column !== column) {
      return <Icon name="ChevronsUpDown" size={16} strokeWidth={2} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ChevronUp" size={16} strokeWidth={2} className="text-primary" />
      : <Icon name="ChevronDown" size={16} strokeWidth={2} className="text-primary" />;
  };

  const handleSort = (column) => {
    onSort(column);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left w-12"></th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('claimId')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Claim Details
                  {getSortIcon('claimId')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Status
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('payoutAmount')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Payout Amount
                  {getSortIcon('payoutAmount')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('fraudRisk')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Fraud Risk
                  {getSortIcon('fraudRisk')}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('processedDate')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Processed Date
                  {getSortIcon('processedDate')}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {claims?.length > 0 ? (
              claims?.map((claim) => (
                <ClaimTableRow key={claim?.claimId} claim={claim} />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Icon name="Search" size={32} strokeWidth={1.5} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No claims found matching your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsTable;