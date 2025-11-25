import React from 'react';
import Icon from '../../../components/AppIcon';

const CostBreakdownCard = ({ breakdown }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Parts': 'Package',
      'Labor': 'Wrench',
      'Paint': 'Paintbrush',
      'Inspection': 'Search',
      'Other': 'MoreHorizontal'
    };
    return icons?.[category] || 'Circle';
  };

  const totalCost = breakdown?.categories?.reduce((sum, cat) => sum + cat?.amount, 0);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="PieChart" size={20} color="var(--color-primary)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-foreground">Cost Breakdown</h3>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          {breakdown?.categories?.map((category, index) => {
            const percentage = ((category?.amount / totalCost) * 100)?.toFixed(1);
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name={getCategoryIcon(category?.name)} size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                    <span className="text-sm font-medium text-foreground">{category?.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">₹{category?.amount?.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-muted-foreground">{percentage}%</div>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-smooth"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Total Estimated Cost</span>
            <span className="text-xl font-bold text-primary">₹{totalCost?.toLocaleString('en-IN')}</span>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} color="var(--color-muted-foreground)" strokeWidth={2} className="mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                {breakdown?.note}
              </div>
            </div>
          </div>
        </div>

        {breakdown?.additionalCharges && breakdown?.additionalCharges?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-sm font-semibold text-foreground mb-3">Additional Charges</div>
            <div className="space-y-2">
              {breakdown?.additionalCharges?.map((charge, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{charge?.name}</span>
                  <span className="font-medium text-foreground">₹{charge?.amount?.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostBreakdownCard;