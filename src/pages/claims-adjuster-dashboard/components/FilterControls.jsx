import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ filters, onFilterChange, onReset }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const riskOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ];

  const amountRangeOptions = [
    { value: 'all', label: 'All Amounts' },
    { value: '0-10000', label: '₹0 - ₹10,000' },
    { value: '10000-25000', label: '₹10,000 - ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000+', label: '₹50,000+' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filter Claims</h3>
        <Button variant="ghost" size="sm" onClick={onReset} iconName="RotateCcw" iconPosition="left">
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search by Claim ID or Policy ID"
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Filter by risk level"
          options={riskOptions}
          value={filters?.riskLevel}
          onChange={(value) => onFilterChange('riskLevel', value)}
        />

        <Select
          placeholder="Filter by amount"
          options={amountRangeOptions}
          value={filters?.amountRange}
          onChange={(value) => onFilterChange('amountRange', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="From Date"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="To Date"
          value={filters?.dateTo}
          onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default FilterControls;