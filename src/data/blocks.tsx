import { type ReactElement } from "react";
// import { Block } from "@/components/templates";
// import { FullWidthLayout, SplitLayout, GridLayout, SidebarLayout, Sidebar, Main } from "@/components/layouts";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

/**
 * ------------------------------------------------------------------
 * BLOCK CONFIGURATION
 * ------------------------------------------------------------------
 * This file is the entry point for your lesson content.
 * 
 * INSTRUCTIONS:
 * 1. Create your content using <Block> components.
 * 2. Use Layout components to organize your blocks.
 * 3. Add your blocks to the `blocks` array below.
 * 
 * ------------------------------------------------------------------
 * CROSS-BLOCK VARIABLES
 * ------------------------------------------------------------------
 * Variables can be shared across blocks using the global store.
 * 
 * DEFINE VARIABLES: src/data/variables.ts (use only variables.ts in this file; same structure as exampleBlocks + exampleVariables)
 * 
 * USAGE IN BLOCKS:
 * 
 * // Reading a value (auto-updates when changed):
 * import { useVar } from '@/stores';
 * const amplitude = useVar('amplitude', 1);
 * 
 * // Setting a value:
 * import { useSetVar } from '@/stores';
 * const setVar = useSetVar();
 * setVar('amplitude', 2.5);
 * 
 * // InlineScrubbleNumber (from variables.ts): getVariableInfo(name) + numberPropsFromDefinition(...)
 * <InlineScrubbleNumber varName="amplitude" {...numberPropsFromDefinition(getVariableInfo('amplitude'))} />
 * 
 * ------------------------------------------------------------------
 * AVAILABLE LAYOUTS
 * ------------------------------------------------------------------
 * 
 * 1. FullWidthLayout
 *    - Best for: Title headers, introductory text, broad visualizations.
 *    - Usage:
 *      <FullWidthLayout maxWidth="xl">
 *          <Block id="intro">...</Block>
 *      </FullWidthLayout>
 * 
 * 2. SplitLayout
 *    - Best for: Side-by-side content (e.g., Text + Visualization).
 *    - Usage:
 *      <SplitLayout ratio="1:1" gap="lg">
 *          <Block id="left">...</Block>
 *          <Block id="right">...</Block>
 *      </SplitLayout>
 * 
 * 3. GridLayout
 *    - Best for: Multiple equal-sized items (cards, galleries).
 *    - Usage:
 *      <GridLayout columns={3} gap="md">
 *          <Block id="item-1">...</Block>
 *          <Block id="item-2">...</Block>
 *          <Block id="item-3">...</Block>
 *      </GridLayout>
 * 
 * 4. SidebarLayout
 *    - Best for: Main content with a sticky sidebar (glossary, controls).
 *    - Usage:
 *      <SidebarLayout sidebarPosition="left" sidebarWidth="medium">
 *          <Sidebar><Block id="sidebar">...</Block></Sidebar>
 *          <Main><Block id="main">...</Block></Main>
 *      </SidebarLayout>
 * 
 * EXAMPLES:
 * See `src/data/exampleBlocks.tsx` for comprehensive examples.
 * 
 * NOTE: If you are seeing examples in the browser instead of this content,
 * check your .env file and set VITE_SHOW_EXAMPLES=false.
 */

import { Block } from "@/components/templates";
import { FullWidthLayout, SplitLayout } from "@/components/layouts";
import { EditableH1, EditableH2, EditableParagraph, InlineScrubbleNumber, InlineTooltip, InlineSpotColor, InlineFormula } from "@/components/atoms";
import { PythagoreanVisualization } from "@/components/atoms/visual/PythagoreanVisualization";
import { getVariableInfo, numberPropsFromDefinition } from "./variables";
import { useVar, useSetVar } from "@/stores";

/**
 * PythagoreanVisualizationBlock - Reactive visualization that responds to variables
 */
const PythagoreanVisualizationBlock = () => {
    const sideA = useVar('sideA', 3);
    const sideB = useVar('sideB', 4);

    return (
        <div className="w-full h-full min-h-96 flex items-center justify-center">
            <PythagoreanVisualization sideA={sideA} sideB={sideB} />
        </div>
    );
};

export const blocks: ReactElement[] = [
    // ═══════════════════════════════════════════
    // SECTION 1: WELCOME
    // ═══════════════════════════════════════════
    <FullWidthLayout key="layout-welcome" maxWidth="xl">
        <Block id="block-welcome" padding="md">
            <EditableH1 id="h1-welcome" blockId="block-welcome">
                The Pythagorean Theorem
            </EditableH1>
            <EditableParagraph id="para-welcome" blockId="block-welcome">
                The Pythagorean theorem is one of the most important ideas in mathematics. It tells us about the relationship between the sides of a <InlineTooltip tooltip="A triangle with one 90-degree angle">right triangle</InlineTooltip>. In this lesson, you'll explore why it works by manipulating the sides of a triangle and watching what happens to the squares we draw on each side.
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    // ═══════════════════════════════════════════
    // SECTION 2: THE THEOREM STATEMENT
    // ═══════════════════════════════════════════
    <FullWidthLayout key="layout-statement" maxWidth="xl">
        <Block id="block-statement" padding="md">
            <EditableH2 id="h2-statement" blockId="block-statement">
                What is the Pythagorean Theorem?
            </EditableH2>
            <EditableParagraph id="para-statement" blockId="block-statement">
                For any right triangle, if we call the two shorter sides <InlineSpotColor varName="sideA" color="#3B82F6">a</InlineSpotColor> and <InlineSpotColor varName="sideB" color="#10B981">b</InlineSpotColor>, and the longest side (called the <InlineTooltip tooltip="The side opposite the right angle">hypotenuse</InlineTooltip>) <InlineSpotColor color="#EF4444">c</InlineSpotColor>, then this relationship is always true:
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    <FullWidthLayout key="layout-equation" maxWidth="xl">
        <Block id="block-equation" padding="md">
            <div className="flex justify-center my-8">
                <InlineFormula latex="a^2 + b^2 = c^2" />
            </div>
        </Block>
    </FullWidthLayout>,

    // ═══════════════════════════════════════════
    // SECTION 3: INTERACTIVE VISUALIZATION
    // ═══════════════════════════════════════════
    <FullWidthLayout key="layout-explore-intro" maxWidth="xl">
        <Block id="block-explore-intro" padding="md">
            <EditableH2 id="h2-explore-intro" blockId="block-explore-intro">
                Explore the Relationship
            </EditableH2>
            <EditableParagraph id="para-explore-intro" blockId="block-explore-intro">
                Let's see this relationship in action. Below, you can adjust the two shorter sides of the triangle (the <InlineSpotColor varName="sideA" color="#3B82F6">blue</InlineSpotColor> and <InlineSpotColor varName="sideB" color="#10B981">green</InlineSpotColor> sides). Watch how the colored squares on each side change, and notice how the area of the red square on the hypotenuse always equals the combined areas of the blue and green squares.
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    <SplitLayout
        key="layout-controls"
        ratio="1:1"
        gap="lg"
        align="stretch"
    >
        <Block id="block-controls" padding="lg">
            <div className="space-y-8">
                <div>
                    <EditableParagraph id="para-control-a" blockId="block-controls">
                        Drag to change side <InlineSpotColor varName="sideA" color="#3B82F6">a</InlineSpotColor> to <InlineScrubbleNumber varName="sideA" {...numberPropsFromDefinition(getVariableInfo('sideA'))} />
                    </EditableParagraph>
                </div>
                <div>
                    <EditableParagraph id="para-control-b" blockId="block-controls">
                        Drag to change side <InlineSpotColor varName="sideB" color="#10B981">b</InlineSpotColor> to <InlineScrubbleNumber varName="sideB" {...numberPropsFromDefinition(getVariableInfo('sideB'))} />
                    </EditableParagraph>
                </div>
            </div>
        </Block>
        <Block id="block-visualization" padding="lg" className="w-full flex items-center justify-center">
            <PythagoreanVisualizationBlock />
        </Block>
    </SplitLayout>,

    // ═══════════════════════════════════════════
    // SECTION 4: WHY IT WORKS
    // ═══════════════════════════════════════════
    <FullWidthLayout key="layout-why-intro" maxWidth="xl">
        <Block id="block-why-intro" padding="md">
            <EditableH2 id="h2-why-intro" blockId="block-why-intro">
                Why Does This Work?
            </EditableH2>
            <EditableParagraph id="para-why-intro" blockId="block-why-intro">
                The theorem works because of how areas combine. When you have a right triangle, the area of the square built on the hypotenuse is exactly equal to the sum of the areas of the squares built on the two other sides. This is not just a coincidence—it's a fundamental geometric truth! Try changing the sides above and you'll see that the equation always balances.
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,

    // ═══════════════════════════════════════════
    // SECTION 5: REAL-WORLD APPLICATIONS
    // ═══════════════════════════════════════════
    <FullWidthLayout key="layout-applications" maxWidth="xl">
        <Block id="block-applications" padding="md">
            <EditableH2 id="h2-applications" blockId="block-applications">
                Where We Use It
            </EditableH2>
            <EditableParagraph id="para-applications" blockId="block-applications">
                The Pythagorean theorem appears everywhere! Builders use it to make sure their walls are truly square. Navigation systems use it to calculate distances. Video game developers use it for physics and graphics. Even smartphones use it for location services. Understanding this theorem opens the door to solving real-world problems involving distances and geometry.
            </EditableParagraph>
        </Block>
    </FullWidthLayout>,
];

export default blocks;
