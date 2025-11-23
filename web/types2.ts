// ============================================================================
// HALL TYPES
// ============================================================================

/**
 * Represents a restaurant hall
 */
export interface Hall {
  id: string;
  name: string;
  capacity?: number;
  description?: string;
  image?: string;
}

/**
 * Date range for hall schema validity
 * If startDate === endDate, it's a single day schema
 */
export interface DateRange {
  startDate: Date | string;
  endDate: Date | string;
}

/**
 * Hall schema defines table and scene layout for a specific date range
 * Each hall can have multiple schemas for different date ranges
 */
export interface HallSchema {
  id: string;
  hallId: string;
  dateRange: DateRange;
  tables: any[];
  scenes: any[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ============================================================================
// EVENT TYPES
// ============================================================================

/**
 * Event that can be created in a hall (e.g., DJ day, Football day)
 * Events are created by Admin and can overlap with hall schemas
 */
export interface HallEvent {
  id: string;
  hallId: string;
  title: string;
  description?: string;
  date: Date | string;
  timeStart?: string;
  timeEnd?: string;
  deposit?: number;
  image?: string;
  status?: "active" | "inactive" | "cancelled";
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ============================================================================
// RE-EXPORT FROM types.ts (if needed)
// ============================================================================


