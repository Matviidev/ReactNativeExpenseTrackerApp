import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

import { AppText } from "@/shared/ui";
import { colors, radius, spacing } from "@/shared/theme";

import { SORT_OPTIONS, TYPE_FILTERS } from "../constants";
import { SortOption, TypeFilter } from "../types";

interface TransactionsFiltersProps {
  type: TypeFilter;
  sort: SortOption;
  onTypeChange: (type: TypeFilter) => void;
  onSortChange: (sort: SortOption) => void;
}

export const TransactionsFilters = ({
  type,
  sort,
  onTypeChange,
  onSortChange,
}: TransactionsFiltersProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.segments}>
        {TYPE_FILTERS.map((filter) => {
          const active = filter.value === type;
          return (
            <Pressable
              key={filter.value}
              onPress={() => onTypeChange(filter.value)}
              style={[styles.segment, active && styles.segmentActive]}
            >
              <AppText
                variant="label"
                color={active ? colors.text : colors.textMuted}
              >
                {filter.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        contentStyle={styles.menu}
        anchor={
          <IconButton
            icon="sort"
            iconColor={colors.text}
            containerColor={colors.surface}
            style={styles.sortButton}
            onPress={() => setMenuVisible(true)}
          />
        }
      >
        {SORT_OPTIONS.map((option) => (
          <Menu.Item
            key={option.value}
            title={option.label}
            leadingIcon={option.value === sort ? "check" : undefined}
            onPress={() => {
              onSortChange(option.value);
              setMenuVisible(false);
            }}
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  segments: {
    flex: 1,
    flexDirection: "row",
    padding: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  segment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  segmentActive: {
    backgroundColor: colors.surface,
  },
  sortButton: {
    margin: 0,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menu: {
    backgroundColor: colors.surface,
  },
});
