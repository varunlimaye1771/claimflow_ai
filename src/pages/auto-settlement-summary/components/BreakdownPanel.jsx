import React from 'react';
import Icon from '../../../components/AppIcon';

const BreakdownPanel = ({ breakdown }) => {
  const breakdownItems = [
    {
      label: 'Estimated Repair Cost',
      value: breakdown?.repairCost,
      icon: 'Wrench',
      color: 'text-foreground'
    },
    {
      label: 'Deductible Amount',
      value: breakdown?.deductible,
      icon: 'Minus',
      color: 'text-warning',
      isNegative: true
    },
    {
      label: 'Policy Coverage',
      value: breakdown?.policyCoverage,
      icon: 'Shield',
      color: 'text-primary'
    },
    {
      label: 'Additional Adjustments',
      value: breakdown?.adjustments,
      icon: 'Settings',
      color: 'text-muted-foreground',
      isNegative: breakdown?.adjustments < 0
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-subtle">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Calculator" size={20} color="var(--color-primary)" strokeWidth={2} />
        <h2 className="text-lg font-semibold text-foreground">Settlement Breakdown</h2>
      </div>
      <div className="space-y-4">
        {breakdownItems?.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={item?.icon} size={16} className={item?.color} strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-foreground">{item?.label}</span>
            </div>
            <div className={`text-base font-semibold ${item?.color}`}>
              {item?.isNegative ? '- ' : ''}₹{Math.abs(item?.value)?.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
        
        <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={16} color="var(--color-primary)" strokeWidth={2.5} />
            </div>
            <span className="text-base font-semibold text-foreground">Final Settlement</span>
          </div>
          <div className="text-xl font-bold text-primary">
            ₹{breakdown?.finalAmount?.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakdownPanel;