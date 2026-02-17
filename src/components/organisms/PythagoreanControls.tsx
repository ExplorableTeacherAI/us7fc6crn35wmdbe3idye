import { useSetVar } from '@/stores';
import { getVariableInfo, numberPropsFromDefinition } from '@/data/variables';
import { InlineScrubbleNumber, InlineSpotColor } from '@/components/atoms';

/**
 * Pythagorean Controls Component
 * Provides sliders and scrubble numbers for adjusting triangle sides
 */
export const PythagoreanControls = () => {
    const setVar = useSetVar();

    const sideAInfo = getVariableInfo('sideA');
    const sideBInfo = getVariableInfo('sideB');

    return (
        <div className="space-y-8">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Adjust side <InlineSpotColor color="#3B82F6">a</InlineSpotColor>
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={sideAInfo?.min || 1}
                        max={sideAInfo?.max || 8}
                        step={sideAInfo?.step || 0.5}
                        defaultValue={sideAInfo?.defaultValue || 3}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                            accentColor: '#3B82F6',
                        }}
                        onChange={(e) => {
                            setVar('sideA', parseFloat(e.target.value));
                        }}
                    />
                    <InlineScrubbleNumber
                        varName="sideA"
                        {...numberPropsFromDefinition(sideAInfo)}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Adjust side <InlineSpotColor color="#10B981">b</InlineSpotColor>
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={sideBInfo?.min || 1}
                        max={sideBInfo?.max || 8}
                        step={sideBInfo?.step || 0.5}
                        defaultValue={sideBInfo?.defaultValue || 4}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                            accentColor: '#10B981',
                        }}
                        onChange={(e) => {
                            setVar('sideB', parseFloat(e.target.value));
                        }}
                    />
                    <InlineScrubbleNumber
                        varName="sideB"
                        {...numberPropsFromDefinition(sideBInfo)}
                    />
                </div>
            </div>
        </div>
    );
};

export default PythagoreanControls;
